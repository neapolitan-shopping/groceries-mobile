export type Item = {
  _id: string;
  itemName?: string;
  price?: number;
  checked?: boolean;
};
export type ItemPayload = {
  _id?: string;
  itemName?: string;
  price?: number;
  checked?: boolean;
};

export enum UpdateItemAction {
  add = "add_item",
  edit = "edit_item",
  delete = "delete_item",
}

export type ItemUpdateBody =
  | {
      updateAction: UpdateItemAction.add;
      payload: ItemPayload;
    }
  | {
      updateAction: UpdateItemAction.edit;
      itemId: string;
      payload: ItemPayload;
    }
  | {
      updateAction: UpdateItemAction.delete;
      itemId: string;
    };
