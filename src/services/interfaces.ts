export interface INavItem {
  title: string;
  path: string;
  icon?: JSX.Element;
}

export interface IFooterItem {
  heading: string;
  items: INavItem[];
}

export interface IFeatureItem {
  title: string;
  description: string;
  icon?: JSX.Element;
}

export interface ITestimonial {
  name: string;
  profession: string;
  company: string;
  location: string;
  language: string;
  rating: number;
  testimonial: string;
  profile_pic?: string;
}

export interface IFilterState {
  showModal: boolean;
  also_speaks: string[];
  from: string;
  price: [number, number]; //min-max range of price
  native_speaker: boolean; //yes or no
  teacher_type: string;
  category: string;
  instant_lesson: boolean;
  auto_accept: boolean;
  availability: string[];
  selectedRadioOptions: number[]; //yo keep track of all the radio options selected, used to update UI
  categoryIndex: number; //the index of chosen category
}

export interface ITutor {
  _id: string;
  native_language: string;
  tutor_type: string;
  languages_taught: string[];
  hourly_rate: number;
  number_of_students: number;
  intro: string;
  demo_rate: string;
  number_of_lessons: string;
  status: string;
  reviews: IReview[];
  instant_rate: boolean;
  available: boolean;
  auto_accept: boolean;
  user: IUser;
  __v: number;
}

interface IReview {
  _id: string;
  rating: number;
  comment: string;
  reviewer: string | IUser;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  salt?: string;
  dob: string;
  profile_pic: string;
  gender: string;
  phone_number: string;
  isTutor: boolean;
  address: IAddress;
  createdAt?: Date;
  updatedAt?: Date;
  __v: number;
}

interface IAddress {
  _id: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  createdAt?: Date;
  updatedAt?: Date;
}
