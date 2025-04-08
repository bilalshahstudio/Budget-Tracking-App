import { Button as AntBtn, DatePicker, Form, Input, Modal } from "antd";
import { InputStyled } from "../../components/InputStyles/input.styles";
import { format, parse } from "date-fns";
import MyDatePicker from "../../components/MyDatePicker/MyDatePicker";
import API from "../../api";
import Home from "./Home";

function AddModal({ data, open, setOpen, isEdit }) {
  // console.log(data);

  // console.log(
  //   data?.expenseDate
  //     ? parse(data?.expenseDate, "dd-MM-yyyy", new Date())
  //     : null
  // );

  const handleSubmit = async (values) => {
    // const addUserData = values;

    console.log(values.date);

    const jsDate = values.date.toDate();

    // const formattedDate = format(jsDate, "yyyy-MM-dd");

    console.log("Selected Date:", values.date);
    console.log("Converted JS Date:", jsDate);

    const payload = {
      ...values,
      date: jsDate, // or formattedDate
    };

    const response = await API.post("/user_budget", payload);

    const result = response?.data;

    // if (!response.ok) {
    //   console.log(result.error);
    // } else {
    //   console.log(result);
    //   setOpen(false);
    // }

    if (response.status === 200) {
      console.log("Budget added successfully:", result);
      setOpen(false);
    } else {
      console.log("Error:", result.error);
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
          // ? parse(data?.expenseDate, "dd-MM-yyyy", new Date())
          // : null,
        }}
      >
        {/* <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12} md={8} lg={6}> */}
        <Form.Item
          style={{ width: "100%" }}
          name="budgetName"
          // label="Expense"
        >
          <InputStyled
            placeholder="Expense Type"
            value="budgetName"
            // defaultValue={data?.expense}
            // value={data?.expense}
            // onChange={(e) => setExpense(e.target.value)}
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
            // onChange={(e) => setPrice(e.target.value)}
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
          name="date"
          style={{ width: "100%" }}
        >
          {/* <InputStyled
                    placeholder="Date"
                    value={data?.expenseDate}
                    onChange={(e) => setExpenseDate(e.target.value)}
                  /> */}
          <DatePicker
          // defaultValue={() => new Date()}
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
