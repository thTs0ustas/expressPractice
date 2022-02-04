let customersModel = []

const getCustomers = () => customersModel

const saveCustomers = (data) => {
  if (!customersModel.length) customersModel.push(...data)
  customersModel = customersModel.map((customer) => {
    const exists = data.find((dataElem) => dataElem.id === customer.id)

    if (!exists.length) return customer
    else return exists
  })
}

module.exports = { getCustomers, saveCustomers }
