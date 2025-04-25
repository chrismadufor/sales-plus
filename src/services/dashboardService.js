import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  runTransaction,
  updateDoc,
} from "firebase/firestore";
import { formatDateTime, getErrorData } from "../utils/utils";

const db = getFirestore();

export const fetchUserProfile = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    const userData = userDoc.exists() ? userDoc.data() : null;
    userData.createdAt = userData.createdAt?.toDate();
    return { error: false, data: userData };
  } catch (err) {
    return getErrorData(err);
  }
};

export const fetchUserProducts = async (uid) => {
  try {
    const productsSnap = await getDocs(
      query(collection(db, "products"), where("userId", "==", uid))
    );
    const products = productsSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // products.createdAt = products.createdAt?.toDate();
    return { error: false, data: products };
  } catch (err) {
    return getErrorData(err);
  }
};

export const fetchUserSales = async (uid) => {
  try {
    const salesSnap = await getDocs(
      query(collection(db, "sales"), where("userId", "==", uid))
    );
    const sales = salesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return { error: false, data: sales };
  } catch (err) {
    return getErrorData(err);
  }
};

export const fetchUserCustomers = async (uid) => {
  try {
    const customersSnap = await getDocs(
      query(collection(db, "customers"), where("userId", "==", uid))
    );
    const customers = customersSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { error: false, data: customers };
  } catch (err) {
    return getErrorData(err);
  }
};

export const addNewProduct = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "products"), data);
    return { error: false, data: docRef };
  } catch (err) {
    return getErrorData(err);
  }
};

export const addNewSale = async (data) => {
  try {
    let items = data.products;
    let userId = data.userId;
    let customer = data.customer;

    await runTransaction(db, async (transaction) => {
      // Step 1: Read all involved products first
      const productDocs = await Promise.all(
        items.map((item) => transaction.get(doc(db, "products", item.value)))
      );

      // Step 2: Validate stock availability for each product
      productDocs.forEach((productDoc, index) => {
        if (!productDoc.exists()) {
          throw new Error(`Product not found: ${items[index].productId}`);
        }
        const currentStock = productDoc.data().stock ?? 0;
        const qtyToSell = items[index].qty;

        if (currentStock < qtyToSell) {
          throw new Error(`Not enough stock for product: ${items[index].name}`);
        }
      });

      // Step 3: Perform all stock updates (writes)
      productDocs.forEach((productDoc, index) => {
        const productRef = productDoc.ref;
        const qtyToSell = items[index].qty;
        const currentStock = productDoc.data().stock;
        const soldNumber = productDoc.data().qtySold;

        transaction.update(productRef, {
          stock: currentStock - qtyToSell,
          qtySold: soldNumber + qtyToSell,
        });
      });

      // Step 4: Create the sale document
      const saleRef = doc(collection(db, "sales"));
      const totalPrice = items.reduce(
        (sum, item) => sum + item.qty * item.price,
        0
      );

      transaction.set(saleRef, {
        items,
        total: totalPrice,
        userId,
        customer,
        createdAt: formatDateTime(new Date()),
      });
    });

    return {
      error: false,
      data: { success: true, message: "Sale created and stock updated." },
    };
  } catch (err) {
    console.log("Error", err);
    return getErrorData(err);
  }
};

export const addNewCustomer = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "customers"), data);
    return { error: false, data: docRef };
  } catch (err) {
    return getErrorData(err);
  }
};

export const editProduct = async (data) => {
  try {
    const productRef = await updateDoc(doc(db, "products", data.id), data.values);
    
    return { error: false, data: productRef };
  } catch (err) {
    return getErrorData(err);
  }
};

export const editCustomer = async (data) => {
  try {
    const productRef = await updateDoc(doc(db, "customers", data.id), data.values);
    
    return { error: false, data: productRef };
  } catch (err) {
    return getErrorData(err);
  }
};
