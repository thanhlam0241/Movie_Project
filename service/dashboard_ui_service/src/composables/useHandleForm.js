import { toast } from "react-toastify";

const useHandleForm = (api, keyId, success, error, final) => {
  const onUpdateRow = async (id, payload) => {
    if (!api || typeof api.update !== "function") {
      return;
    }

    if (!id) {
      toast.error("Error");
      return;
    }
    await api
      .update(id, payload)
      .then(() => {
        toast.success("Update successfully");
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
    await api
      .update(row[keyId], row)
      .then(() => {
        toast.success("Delete successfully");
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
    await api
      .insert(payload)
      .then(() => {
        toast.success("Add successfully");
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
