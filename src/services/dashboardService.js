import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { getErrorData } from "../utils/utils";

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
    const docRef = await addDoc(collection(db, "sales"), data);
    return { error: false, data: docRef };
  } catch (err) {
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
