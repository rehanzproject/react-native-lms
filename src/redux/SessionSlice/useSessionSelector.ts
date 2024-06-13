import { useSelector } from "react-redux";
import { SessionType } from "../../types";

export const useToken = () => useSelector((state : SessionType) => state.session.token);
