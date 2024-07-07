import { toast } from "react-toastify";
import { changeReload } from "store/appslice.js";
import { useDispatch } from "react-redux";

const useHandleForm = (api, keyId, start, success, error, final) => {
  const dispatch = useDispatch();
  const onUpdateRow = async (id, payload) => {
    if (!api || typeof api.update !== "function") {
      return;
    }

    if (!id) {
      toast.error("Error");
      return;
    }

    if (start && typeof start === "function") start();
    await api
      .update(id, payload)
      .then(() => {
        toast.success("Update successfully");
        dispatch(changeReload());
        if (success && typeof success === "function") success();
      })
      .catch((err) => {
        toast.success("Update fail.");
        if (error && typeof error === "function") error();
      })
      .finally(() => {
        if (final && typeof final === "function") final();
      });
  };
  const onDeleteRow = async (row) => {
    if (!api || typeof api.delete !== "function") {
      return;
    }

    if (!row[keyId]) {
      toast.error("Error");
      return;
    }
    if (start && typeof start === "function") start();
    await api
      .delete(row[keyId], row)
      .then(() => {
        toast.success("Delete successfully");
        dispatch(changeReload());
        if (success && typeof success === "function") success();
      })
      .catch((err) => {
        toast.success("Delete fail.");
        if (error && typeof error === "function") error();
      })
      .finally(() => {
        if (final && typeof final === "function") final();
      });
  };
  const onInsertRow = async (payload) => {
    if (!api || typeof api.insert !== "function") {
      return;
    }

    if (!payload) {
      toast.error("Error");
      return;
    }
    if (start && typeof start === "function") start();
    await api
      .insert(payload)
      .then(() => {
        toast.success("Add successfully");
        dispatch(changeReload());
        if (success && typeof success === "function") success();
      })
      .catch((err) => {
        toast.success("Add fail.");
        if (error && typeof error === "function") error();
      })
      .finally(() => {
        if (final && typeof final === "function") final();
      });
  };
  return { onDeleteRow, onInsertRow, onUpdateRow };
};

export default useHandleForm;
