import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../api';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TreeDeciduous, TreePalm, TreePine, Trees } from 'lucide-react';

const images = [
  '/Onboard04.png',
  '/Onboard01.png',
  '/Onboard02.png',
  '/Onboard03.png'
];

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [rotateClass, setRotateClass] = useState('rotate-4'); // Mặc định nghiêng phải

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prevImage => {
        const currentIndex = images.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % images.length;
        return images[nextIndex];
      });

      // Chuyển đổi hiệu ứng nghiêng trái/phải
      setRotateClass(prevClass =>
        prevClass === 'rotate-4' ? '-rotate-4' : 'rotate-4'
      );
    }, 3000); // Thay đổi ảnh mỗi 5s

    return () => clearInterval(interval);
  }, []);

  const formik = useFormik({
    initialValues: {
      usernameOrEmail: '',
      password: ''
    },
    validationSchema: Yup.object({
      usernameOrEmail: Yup.string().required(
        'Vui lòng nhập username hoặc email.'
      ),
      password: Yup.string()
        .required('Vui lòng nhập mật khẩu.')
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự.')
    }),
    onSubmit: async values => {
      try {
        await login(values.usernameOrEmail, values.password);
        toast.success('Đăng nhập thành công');
        navigate('/');
      } catch (err: any) {
        toast.error('Thông tin đăng nhập không đúng');
      }
    }
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center p-4">
        <p className="my-2 py-4 text-4xl font-bold text-green-800">
          
          CHÀO MỪNG ĐẾN VỚI HỆ THỐNG QUẢN LÝ CÂY TRỒNG
        </p>
        <div className="flex w-1/2 justify-between text-green-600">
          <TreeDeciduous size={44} />
          <TreePalm size={44} />
          <TreePine size={44} />
          <Trees size={44} />
        </div>
      </div>
      <p className="flex justify-center bg-linear-to-r/increasing from-indigo-500 to-teal-400 py-4 text-4xl font-bold text-violet-50">
        Green Vision
      </p>
      <div className="flex items-center justify-center gap-20 p-4 pt-12">
        {/* Form đăng nhập */}
        <div className="h-[500px] w-1/4 rounded-xl border border-neutral-200 bg-green-100 p-4 shadow-2xl">
          <h1 className="border-b border-neutral-400 py-4 text-2xl font-bold text-green-800">
            Đăng nhập
          </h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="">
              <p className="py-2 font-semibold">Tên đăng nhập hoặc Email:</p>
              <input
                className="w-11/12 border-b border-neutral-400 p-2 outline-none hover:cursor-pointer hover:rounded-lg hover:bg-neutral-100"
                placeholder="Nhập tên hoặc Email"
                type="text"
                name="usernameOrEmail"
                value={formik.values.usernameOrEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.usernameOrEmail &&
              formik.errors.usernameOrEmail ? (
                <p style={{ color: 'red' }}>{formik.errors.usernameOrEmail}</p>
              ) : null}
            </div>
            <div className="">
              <p className="py-2 font-semibold">Mật khẩu:</p>
              <input
                placeholder="Nhập mật khẩu ..."
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-11/12 border-b border-neutral-400 p-2 outline-none hover:cursor-pointer hover:rounded-lg hover:bg-neutral-100"
              />
              {formik.touched.password && formik.errors.password ? (
                <p style={{ color: 'red' }}>{formik.errors.password}</p>
              ) : null}
            </div>
            <div className="flex justify-center p-4 pt-16">
              <button
                className="w-1/2 rounded-lg bg-green-700 py-3 font-semibold text-white transition hover:cursor-pointer hover:bg-green-600"
                type="submit"
              >
                Đăng nhập
              </button>
            </div>
          </form>
        </div>

        {/* Hình ảnh nghiêng & tự thay đổi sau 5s */}
        <div
          className={`h-[500px] w-[300px] overflow-hidden rounded-2xl shadow-2xl transition-transform duration-500 ease-in-out ${rotateClass}`}
        >
          <img
            className="h-full w-full rounded-2xl border border-neutral-200 object-cover opacity-100 drop-shadow-xl transition-opacity duration-500"
            src={currentImage}
            alt="Ảnh quảng cáo"
          />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
