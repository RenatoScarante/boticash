import api from "./api";

const CASHBACK_RULE_LIST = "@cashbackRuleList";

export async function getCashbackRules() {
  var list = localStorage.getItem(CASHBACK_RULE_LIST);
  var cashbackRuleList = [];

  if (list === [] || list === undefined || list === null) {
    try {
      await api
        .get(process.env.REACT_APP_CASHBACK_RULE_LIST)
        .then(res => {
          cashbackRuleList = res.data;
          localStorage.setItem(
            CASHBACK_RULE_LIST,
            JSON.stringify(cashbackRuleList)
          );
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  } else {
    cashbackRuleList = JSON.parse(list);
  }

  return cashbackRuleList;
}

export async function getCashback(userId) {
  let cashback = {};

  try {
    await api
      .get(
        userId
          ? `${process.env.REACT_APP_CASHBACK_LIST}${userId}`
          : process.env.REACT_APP_CASHBACK_GET
      )
      .then(res => {
        cashback = res.data[0];
      })
      .catch(error => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }

  return cashback;
}
