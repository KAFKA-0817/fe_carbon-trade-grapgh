import axios from "axios";

export const getAllClients = (req) =>
  axios({ method: "post", data: req, url: "/apis/client/getAll" });

export const getAllProducers = (req) =>
  axios({ method: "post", data: req, url: "/apis/producer/getAll" });

export const getAllSuppliers = (req) =>
  axios({ method: "post", data: req, url: "/apis/supplier/getAll" });

export const getAllDistributors = (req) =>
  axios({ method: "post", data: req, url: "/apis/distributor/getAll" });

export const getAllTransactions = () =>
  axios({ method: "get", url: "/apis/transaction/getAll" });

export const getCurrentTransaction = () =>
  axios({ method: "get", url: "/apis/transaction/getCurrentTransaction" });

export const getAllNodeNames = () =>
  axios({ method: "get", url: "/apis/transaction/getAllNodeNames" });

export const addNodes = (req) =>
  axios({ method: "post", data: req, url: "/apis/transaction/addNodes" });

export const calculate = () =>
  axios({ method: "post", url: "/apis/transaction/calculate" });

export const saveTransaction = (req) =>
  axios({ method: "post", data: req, url: "/apis/transaction/save" });
