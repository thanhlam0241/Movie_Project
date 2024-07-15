import { toast } from "react-toastify";
import { changeReload } from "store/appslice.js";
import { useDispatch } from "react-redux";

const useHandleForm = (api, id, start, success, error, final) => {
  const dispatch = useDispatch();
  const onUpdateRow = async (payload) => {
    if (!api || typeof api.update !== "function") {
      console.log("Not exist function update");
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
        let mes = "Update fail";
        if (err && err.response && err.response.data) mes = err.response.data;
        toast.error(mes);
        if (error && typeof error === "function") error();
      })
      .finally(() => {
        if (final && typeof final === "function") final();
      });
  };
  const onDeleteRow = async () => {
    if (!api || typeof api.delete !== "function") {
      console.log("Not exist function delete");
      return;
    }

    if (!id) {
      toast.error("Error");
      return;
    }
    if (start && typeof start === "function") start();
    await api
      .delete(id)
      .then(() => {
        toast.success("Delete successfully");
        dispatch(changeReload());
        if (success && typeof success === "function") success();
      })
      .catch((err) => {
        let mes = "Delete fail";
        if (err && err.response && err.response.data) mes = err.response.data;
        toast.error(mes);
        if (error && typeof error === "function") error();
      })
      .finally(() => {
        if (final && typeof final === "function") final();
      });
  };
  const onInsertRow = async (payload) => {
    if (!api || typeof api.insert !== "function") {
      console.log("Not exist function insert");
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
        let mes = "Fail";
        if (err && err.response && err.response.data) mes = err.response.data;
        toast.error(mes);
        if (error && typeof error === "function") error();
      })
      .finally(() => {
        if (final && typeof final === "function") final();
      });
  };
  return { onDeleteRow, onInsertRow, onUpdateRow };
};

export default useHandleForm;
