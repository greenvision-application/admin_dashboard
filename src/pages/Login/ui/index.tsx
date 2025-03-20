import React from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../api";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      usernameOrEmail: "",
      password: "",
    },
    validationSchema: Yup.object({
      usernameOrEmail: Yup.string().required("Vui lòng nhập username hoặc email."),
      password: Yup.string()
        .required("Vui lòng nhập mật khẩu.")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự."),
    }),
    onSubmit: async (values) => {
      try {
        await login(values.usernameOrEmail, values.password);
        toast.success("Đăng nhập thành công");
        navigate("/");
      } catch (err: any) {
        toast.error("Thông tin đăng nhập không đúng");
      }
    },
  });

  return (
    <div>
      <h1>Đăng nhập</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Username hoặc Email:</label>
          <input
            type="text"
            name="usernameOrEmail"
            value={formik.values.usernameOrEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.usernameOrEmail && formik.errors.usernameOrEmail ? (
            <p style={{ color: "red" }}>{formik.errors.usernameOrEmail}</p>
          ) : null}
        </div>
        <div>
          <label>Mật khẩu:</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <p style={{ color: "red" }}>{formik.errors.password}</p>
          ) : null}
        </div>
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

export default LoginPage;