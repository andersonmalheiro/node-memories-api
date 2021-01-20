import { PaginationFilters } from "../../../utils/pagination";

export interface IListUsersRequestDTO extends PaginationFilters {
  name?: string;
  email?: string;
  id?: string;
}
