import { NavigateFunction } from "react-router-dom";

const globalNavigate = { navigate: null } as {
  navigate: null | NavigateFunction;
};

export default globalNavigate;
