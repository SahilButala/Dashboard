export interface product {
  name: any;
  price: string;
  stocks: string;
  _id? : string
}

const CreateProductsinitialData: product = {
  name: "",
  price: "",
  stocks: ""
};

export default CreateProductsinitialData;
