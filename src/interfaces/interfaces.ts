export interface Product {
  productId?: string;
  brand: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  salePrice?: number;
  productImage?: string;
  categoryId?: string;
  subCategoryId?: string;
  categoryName?: string;
  subCategoryName?: string;
  url?: string;
  stock?: number;
  sold?: number;
  createDate?: string;
  updateDate?: string;
  isUserCreated?: boolean;
  reviews?: [
    {
      customerName: string;
      rating: number;
      comment: string;
    }
  ];
  success?: boolean;
  message?: string;
  userMessage?: string;
}
