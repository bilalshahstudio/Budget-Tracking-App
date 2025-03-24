import { Button as AntBtn, DatePicker, Form, Modal } from "antd";
import { InputStyled } from "../../components/InputStyles/input.styles";
import { parse } from "date-fns";
import MyDatePicker from "../../components/MyDatePicker/MyDatePicker";

function AddModal({ data, open, setOpen }) {
  console.log(data);

  console.log(
    data?.expenseDate
      ? parse(data?.expenseDate, "dd-MM-yyyy", new Date())
      : null
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addUserData = { expense, price, expenseDate };

    const response = await fetch("http://localhost:5000/", {
      method: "POST",
      body: JSON.stringify(addUserData),
      headers: {
        "Content-Type": "appication/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
    }
    if (response.ok) {
      console.log(result);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <Modal
      title="Add Budget"
      open={open}
      centered
      // onOk={handleOk}
      // confirmLoading={confirmLoading}
      onCancel={handleCancel}
      destroyOnClose
      footer={null}
    >
      <Form
        onFinish={handleSubmit}
        // labelCol={{ xs: { span: 24 }, sm: { span: 8 } }}
        // wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
        layout="vertical"
        style={{
          // maxWidth: 600,
          // width: "600px",
          justifyItems: "center",
        }}
        initialValues={{
          ...data,
          expenseDate: data?.expenseDate,
          // ? parse(data?.expenseDate, "dd-MM-yyyy", new Date())
          // : null,
        }}
      >
        {/* <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12} md={8} lg={6}> */}
        <Form.Item
          style={{ width: "100%" }}
          name="expense"
          // label="Expense"
        >
          <InputStyled
            placeholder="Expense Type"
            // defaultValue={data?.expense}
            // value={data?.expense}
            onChange={(e) => setExpense(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          style={{ width: "100%" }}
          name="price"
          //  label="Price"
        >
          <InputStyled
            placeholder="Price"
            // defaultValue={`${data?.price}`}
            // value={`${data?.price}`}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Item>
        {/* <Form.Item label="Date">
                  <DatePickerStyled
                    value={expenseDate}
                    onChange={(e) => setExpenseDate(e.target.value)}
                  />
                </Form.Item> */}
        <Form.Item
          //  label="Date"
          //   name="expenseDate"
          style={{ width: "100%" }}
        >
          {/* <InputStyled
                    placeholder="Date"
                    value={data?.expenseDate}
                    onChange={(e) => setExpenseDate(e.target.value)}
                  /> */}
          <DatePicker
          // defaultValue={new Date(data?.expenseDate)}
          // onChange={(e) => setExpenseDate(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <AntBtn
            style={{
              backgroundColor: "#000",
              color: "#fff",
              borderRadius: 0,
            }}
            type="primary"
            htmlType="submit"
          >
            Submit
          </AntBtn>
        </Form.Item>
        {/* </Col>
                </Row> */}
      </Form>
    </Modal>
  );
}

export default AddModal;
