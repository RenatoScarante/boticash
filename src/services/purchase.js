import api from "./api";

const PURCHASE_STATUS_LIST = "@purchaseStatusList";

function addStatusField(purchase) {
  const purchaseStatusList = getPuchaseStatusList();

  return {
    ...purchase,
    status: purchaseStatusList.find(
      status => status.id === purchase.purchase_statusId
    )
  };
}

export function getPuchaseStatusList() {
  var list = localStorage.getItem(PURCHASE_STATUS_LIST);
  var purchaseStatusList = [];

  if (list === [] || list === undefined || list === null) {
    try {
      api
        .get(process.env.REACT_APP_PURCHASE_STATUS_LIST)
        .then(res => {
          purchaseStatusList = res.data;
          localStorage.setItem(
            PURCHASE_STATUS_LIST,
            JSON.stringify(purchaseStatusList)
          );
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  } else {
    purchaseStatusList = JSON.parse(list);
  }

  return purchaseStatusList;
}

export async function getPurchase(id) {
  let purchase = {};

  try {
    await api
      .get(`${process.env.REACT_APP_PURCHASE_GET}/${id}`)
      .then(res => {
        purchase = addStatusField(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }

  return purchase;
}

export async function getPurchaseList(userId) {
  var purchases = [];

  try {
    await api
      .get(
        userId
          ? `${process.env.REACT_APP_PURCHASE_LIST}${userId}`
          : process.env.REACT_APP_PURCHASE_GET
      )
      .then(res => {
        purchases = res.data.map(item => (item = addStatusField(item)));
      })
      .catch(error => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }

  return purchases;
}

export async function updatePurchase(purchase) {
  const newData = {
    code: purchase.code,
    value: purchase.value,
    date: purchase.date,
    userId: purchase.userId,
    purchase_statusId: purchase.purchase_statusId
  };

  try {
    await api
      .put(`${process.env.REACT_APP_PURCHASE_PUT}/${purchase.id}`, newData)
      .then(res => {
        purchase = addStatusField(res.data);
      })
      .catch(error => {
        console.log(error);
        return {};
      });
  } catch (error) {
    console.log(error);
    return {};
  }

  return purchase;
}

export async function deletePurchase(purchaseId) {
  try {
    await api
      .delete(`${process.env.REACT_APP_PURCHASE_DELETE}/${purchaseId}`)
      .then(res => {})
      .catch(error => {
        console.log(error);
        return false;
      });
  } catch (error) {
    console.log(error);
    return false;
  }

  return true;
}
