import Swal, { SweetAlertIcon } from "sweetalert2";

export const topAlert = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
export const notificacionTop =(icon: SweetAlertIcon,title: string)=>topAlert.fire({icon,title})
        
export const alertCenter = Swal.mixin({
          position: "center",
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: "Aceptar",
          cancelButtonText: "Cancelar",
          reverseButtons: true,
        });
export const bigAlert=(title:string,message:string,icon:SweetAlertIcon)=>  void Swal.fire(title,message, icon);
