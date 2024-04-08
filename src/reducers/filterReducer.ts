import { IFilterState } from "../services/interfaces";

const val: IFilterState = JSON.parse(
  localStorage.getItem("filterState") as string
);

const initialState: IFilterState = {
  showModal: false,
  also_speaks: [],
  from: "",
  price: [0, 1e9],
  native_speaker: false,
  teacher_type: "",
  category: "",
  instant_lesson: false,
  auto_accept: false,
  availability: [],
  selectedRadioOptions: new Array<number>(9).fill(-1),
  categoryIndex: 0,
};

type priceRange = [number, number];

type actionType = {
  type: string;
  payload?: number | string | boolean | priceRange;
};

export const filterReducer = (
  state = val ? val : initialState,
  action: actionType
) => {
  switch (action.type) {
    case "filter/add_also_speaks":
      return {
        ...state,
        also_speaks: [...state.also_speaks, action.payload as string],
      };
    case "filter/remove_also_speaks":
      return {
        ...state,
        also_speaks: state.also_speaks.filter((item) => {
          return item !== (action.payload as string);
        }),
      };
    case "filter/from":
      return { ...state, from: action.payload as string };
    case "filter/price":
      return { ...state, price: action.payload as priceRange };
    case "filter/native_speaker":
      return { ...state, native_speaker: action.payload as boolean };
    case "filter/add_availability":
      return {
        ...state,
        availability: [...state.availability, action.payload as string],
      };
    case "filter/remove_availability":
      return {
        ...state,
        availability: state.availability.filter((item) => {
          return item !== (action.payload as string);
        }),
      };
    case "filter/category":
      return { ...state, category: action.payload as string };
    case "filter/instant_lesson":
      return { ...state, instant_lesson: action.payload as boolean };
    case "filter/auto_accept":
      return { ...state, auto_accept: action.payload as boolean };
    case "filter/teacher_type":
      return { ...state, teacher_type: action.payload as string };
    case "filter/update_radio_options":
      return {
        ...state,
        selectedRadioOptions: state.selectedRadioOptions.map((item, index) => {
          const [category, option] = action.payload as priceRange;

          if (index === category) {
            return option;
          }

          return item;
        }),
      };
    case "filter/category_chosen":
      return { ...state, categoryIndex: action.payload as number };
    case "filter/clear":
      return { ...initialState, showModal: true };
    case "filter/open_modal":
      return { ...state, showModal: true };
    case "filter/close_modal":
      return { ...state, showModal: false };
    default:
      return state;
  }
};
