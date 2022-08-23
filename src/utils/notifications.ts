import Swal, { SweetAlertIcon } from "sweetalert2";

export const NotificaciónTop = Swal.mixin({
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
        
        
export const alertCenter = Swal.mixin({
          position: "center",
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: "Aceptar",
          cancelButtonText: "Cancelar",
          reverseButtons: true,
        });
export const bigAlert=(title:string,message:string,icon:SweetAlertIcon)=>  void Swal.fire(title,message, icon);
