import { DatePicker, Form, Modal } from "antd";
import { InputStyled } from "../../components/InputStyles/input.styles";
import { format } from "date-fns";
import dayjs from "dayjs";
import API from "../../api";
import StyledButton from "../../components/ButtonStyles/Button";

function AddModal({
  data,
  open,
  setOpen,
  isEdit,
  refreshData,
  showNotification,
}) {
  console.log(`data:${data}`, `is edit:${isEdit}`, open);

  const handleSubmit = async (values) => {
    console.log(values);
    const payload = {
      ...values,
      date: values.date?.toISOString(),
    };

    //in case of edit

    if (isEdit && data._id) {
      payload._id = data._id;
    }

    const response = await API.post("/user_budget", payload);
    console.log(response);
    const result = response?.data;

    if (response.status === 200) {
      console.log("Budget added successfully", result);
      showNotification(
        "success",
        isEdit ? "Budget Updated" : "Budget Added",
        isEdit
          ? "The budget item has been updated successfully."
          : "A new budget item has been added."
      );

      setOpen(false);
      refreshData();
    } else {
      console.log("Error:", result.error);
      showNotification(
        "error",
        "Error",
        "An error occurred while saving the budget."
      );
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <Modal
      title={`${isEdit ? "Edit" : "Add"} Budget`}
      open={open}
      centered
      onCancel={handleCancel}
      destroyOnClose
      footer={null}
    >
      <Form
        onFinish={handleSubmit}
        layout="vertical"
        style={{
          justifyItems: "center",
        }}
        initialValues={{
          ...data,
          date: data?.date ? dayjs(data.date) : null,
        }}
      >
        <Form.Item style={{ width: "100%" }} name="budgetName">
          <InputStyled placeholder="Expense Type" />
        </Form.Item>
        <Form.Item style={{ width: "100%" }} name="price">
          <InputStyled placeholder="Price" />
        </Form.Item>
        <Form.Item name="date">
          <DatePicker
            placeholder="Select date"
            format="DD-MM-YYYY"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item>
          <StyledButton type="primary" htmlType="submit">
            Submit
          </StyledButton>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddModal;
