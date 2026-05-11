import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";
import { Modal as ModalDialog } from "../../components/ui/modal/ModalDialog"
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import apiClient from "../../services/Api";
import Swal from "sweetalert2";

export default function SignIn() {
  const [formLogin, setFormLogin] = useState({
    email:"",
    password:""
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // useEffect(() => {
  //   if(loading){
  //     Swal.fire({
  //       title: "Sedang Login",
  //       html: "Mohon Tunggu Sebentar",
  //       allowOutsideClick: false,
  //       didOpen: () => {
  //         Swal.showLoading()
  //       }
  //     })
  //   }else{
  //     Swal.close()
  //   }
  // }, [loading])
   const submitLogin = async (e) => {
    e.preventDefault()

    if(!formLogin.email || !formLogin.password){
      console.log("Tolong masukan email dan password")
      Swal.fire('Peringatan', 'Tolong masukkan email dan password', 'warning');
      return
    }
   Swal.fire({
    title: 'Sedang Memproses...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
    console.log(loading,"Loading.......")
    try{
      const response = await apiClient.post("/login", formLogin)
      const token = response.data.authorisation.token;
      const dataUser = response.data.user;
      const userId = response.data.user.id;

      localStorage.setItem("AuthToken", token);
      localStorage.setItem("DataUser", JSON.stringify(dataUser));
      localStorage.setItem("IdUser", userId);

      await Swal.fire({
      icon: 'success',
      title: 'Berhasil Masuk!',
      timer: 1500,
      showConfirmButton: false
    });

      navigate('/home')
    }catch(err){
      console.log("Gagal login", err)
      // setLoading(false)
     Swal.fire({
      icon: 'error',
      title: 'Login Gagal',
      text: 'Email atau password salah, silakan cek kembali.'
    });
      setLoading(false)
    }
  }
  return (
    <>
    {/* <ModalDialog isOpen={loading}>Loading........</ModalDialog> */}
      <PageMeta
        title="Survey App"
      />
      <AuthLayout>
        <SignInForm submitLogin={submitLogin}
        onChangeEmail={(e) => setFormLogin({...formLogin, email: e.target.value})}
        onChangePassword={(e) => setFormLogin({...formLogin, password: e.target.value})}
        />
      </AuthLayout>
    </>
  );
}
