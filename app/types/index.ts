export type InputType = {
    email: string;
    password: string;
  };

export type FetchedUser = {
  id:number,
    name:string,
  email: string,
    
    // isAdmin: boolean
}  

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  categories: any;
};

export type CreateUserInputs = {
  name: string;
  email: string;
  password: string;
  category: string[];
};

export type UserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  id:string
};