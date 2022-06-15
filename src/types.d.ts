//---------- user type -----------//

declare interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  isadmin: boolean;
  img: string;
  address: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

declare interface UserLogin {
  email: string;
  password: string;
}

declare interface UserUpdate {
  username: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}

declare interface UserRegister extends UserLogin {
  username: string;
}

declare type UserState = {
  status: "loading" | "idle";
  info: User;
  orders: {
    list: Order[];
    message: string;
  };
};

declare interface UserReview {
  name: string;
  userId: string;
  rating: number;
  review: string;
  userImg: string;
  reply: UserReply[];
}

declare interface UserReply {
  name: string;
  userId: string;
  userImg: string;
  content: string;
  isAdmin: boolean;
}

//---------- product type -----------//

declare interface Product {
  _id: string;
  name: string;
  price: number;
  desc: string;
  categories: string;
  img: string;
  ram: string;
  rom: string;
  cpu: string;
  gpu: string;
  screen: string;
  camera: string;
  battery: string;
  os: string;
  brand: string;
  color: string;
  instock: boolean;
  reviews: UserReview[];
  isnew: boolean;
}

declare interface ProductBanner {
  id: string;
  name: string;
  price: number;
  img: string;
  desc: string;
  isnew: boolean;
}
declare interface NewProductsQuery {
  isLoading: boolean;
  error: string | null;
  data: Product[];
}

declare type ProductsState = {
  status: "loading" | "idle";
  error: string | null;
  list: Product[];
  filteredProducts: Product[];
  productArrivals: Product[];
  filter: any[];
};

declare interface Products {
  list: Product[];
}

declare interface InfiniteProduct {
  products: Product[];
  next: number;
}

declare type FetchProductsError = {
  message: string;
};

declare type Category =
  | "cpu"
  | "gpu"
  | "ram"
  | "rom"
  | "screen"
  | "battery"
  | "camera"
  | "os"
  | "brand";
declare type TypeCategories = { [key in InfoProduct]: string };

declare type FilterInfo = {
  filterByBrand: string;
  filterByPrice: string;
  filterByDemand: string;
  filterByScreen: string;
  sort: string;
};

declare interface PostReviewProduct {
  productId: string;
  review: {
    userId: string;
    name: string;
    review: string;
    rating: number;
    userImg: string;
  };
}

//---------- cart type -----------//

declare interface CartItem extends Product {
  quantity: number;
}

declare interface Cart {
  products: CartItem[];
  quantity: number;
  total: number;
}

//---------- order type -----------//

declare interface OrderType {
  _id: number;
  userId: string;
  products: [
    {
      _id: string;
      quantity: number;
      productId: string;
      img: string;
      name: string;
    }
  ];
  amount: number;
  address: string;
  status: string;
  payment: string;
  createdAt: string;
  updatedAt: string;
}

declare interface OrderInfo {
  userId: string;
  phone: string;
  username: string;
  products: {
    productId: string;
    quantity: number;
    name: string;
    img: string;
  }[];
  amount: number;
  address: string;
  payment: string;
  note: string;
}
