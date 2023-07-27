export type ListItem={
    id:number,
    name:string,
    listId: number,
}
export type UserListItem={
    id:number,
    name:string,
    userId: number,
}
export type ListStoreState = {
    
    isAuthenticated: boolean,
    sortOrder: string,
    selectedList: number,
    userList: UserListItem[],
    completedList: ListItem[],
    activeCompletedList: ListItem[],
    allListItems: ListItem[],
    activeList: ListItem[],
    addListPopup: boolean,
  }