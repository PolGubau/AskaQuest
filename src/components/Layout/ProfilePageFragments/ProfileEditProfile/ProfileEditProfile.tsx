import React, { useState } from 'react'
import ButtonWithIcon from 'src/components/Buttons/ButtonWithIcon/ButtonWithIcon'
import UserInterface from 'src/interfaces/user'
import { updateUser } from 'src/services/update/updateUser'
import PATH from 'src/utils/path'
import Swal from 'sweetalert2'
import styles from './ProfileEditProfile.module.css'
import { useRouter } from 'next/router'
import { colors } from 'src/styles/theme'
import { deleteUser } from 'src/services/delete/deleteUser'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs')

export default function ProfileEditProfile ({
  userLoged
}: {
  userLoged: UserInterface
}) {
  const router = useRouter()
  const [show, setShow] = useState(false)

  const handleChangeUsername = () => {
    Swal.fire({
      title: 'Write your new Username.',
      input: 'text',
      inputPlaceholder: 'Enter your new UserName'
    }).then(async (result) => {
      if (result.isConfirmed) {
        // we need to check if this userName is already taken
        const res = await fetch(`${PATH.API.USER_BY_USERNAME}/${result.value}`)
        const userIfIsTaken = await res.json()
        console.log(userIfIsTaken)
        if (!userIfIsTaken.error) {
          return await Swal.fire(
            'Ouups!',
            'This userName is already taken',
            'error'
          )
        }

        updateUser(PATH.API.USER_BY_ID, {
          ...userLoged,
          userName: result.value
        })
        Swal.fire(`Your new userName: ${result.value}`)
        localStorage.setItem(
          'user',
          JSON.stringify({
            ...userLoged,
            userName: result.value
          })
        )
        router.replace(`${PATH.PROFILE}/${result.value}`).then(() => {
          window.location.reload()
        })
      }
    })
  }
  const handleChangeEmail = () => {
    Swal.fire({
      title: 'Input email address',
      input: 'email',
      inputPlaceholder: 'Enter your email address'
    }).then((result) => {
      if (result.isConfirmed) {
        updateUser(PATH.API.USER_BY_ID, {
          ...userLoged,
          email: result.value
        })
        Swal.fire(`Your new email: ${result.value}`)
        localStorage.setItem(
          'user',
          JSON.stringify({
            ...userLoged,
            email: result.value
          })
        )
      }
    })
  }
  const handleChangePassword = () => {
    Swal.fire({
      title: 'Enter your old password',
      input: 'password',
      inputPlaceholder: 'Enter your password',
      inputAttributes: {
        maxlength: '30',
        autocapitalize: 'off',
        autocorrect: 'off'
      }
    }).then((oldPassword) => {
      if (oldPassword.isConfirmed) {
        const passwordGuessed = bcrypt.compareSync(
          oldPassword.value,
          userLoged.password
        )
        if (passwordGuessed) {
          Swal.fire({
            title: 'Enter your new password',
            input: 'password',
            inputPlaceholder: 'Enter your password',
            inputAttributes: {
              maxlength: '30',
              autocapitalize: 'off',
              autocorrect: 'off'
            }
          }).then((newPassword) => {
            if (newPassword.isConfirmed) {
              const salt = bcrypt.genSaltSync(10)
              const hashPassword = bcrypt.hashSync(newPassword.value, salt)
              updateUser(PATH.API.USER_BY_ID, {
                ...userLoged,
                password: hashPassword
              })
              localStorage.setItem(
                'user',
                JSON.stringify({
                  ...userLoged,
                  password: hashPassword
                })
              )
            }
          })
        } else Swal.fire('Wrong password')
      }
    })
  }
  const handleDeleteUser = () => {
    Swal.fire({
      title: 'Are you sure you want to delete your account?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: colors.primary,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your account has been deleted.',
          'success'
        )
        deleteUser(PATH.API.USER_BY_ID, userLoged.ID)
        localStorage.clear()
        void router.push(PATH.HOME)
      }
    })
  }
  const handleResetUser = () => {
    updateUser(PATH.API.RESET_USER, { ...userLoged })
  }
  return (
    <>
      <div className={styles.conatiner}>
        <div className={styles.followButton} onClick={() => setShow(!show)}>
          <ButtonWithIcon icon={show ? 'less' : 'more'} text="Edit Profile" />
        </div>
        <div>
          {show && (
            <div className={styles.editProfileContainer}>
              <h2 className={styles.title}>Edit Profile</h2>
              <section className={styles.ProfileEditButtons}>
                <div className={styles.button} onClick={handleChangeUsername}>
                  <ButtonWithIcon icon="user" text="Change Username" />
                </div>
                <div className={styles.button} onClick={handleChangePassword}>
                  <ButtonWithIcon icon="password" text="Change Password" />
                </div>
                <div className={styles.button} onClick={handleChangeEmail}>
                  <ButtonWithIcon icon="email" text="Change Email" />
                </div>
                <div className={styles.button} onClick={handleResetUser}>
                  <ButtonWithIcon icon="delete" text="Reset Account" backgroundColor={colors.wrong}/>
                </div>
                <div className={styles.button} onClick={handleDeleteUser}>
                  <ButtonWithIcon icon="delete" text="Delete Account" backgroundColor={colors.wrong}/>
                </div>

                <div
                  className={styles.closeButton}
                  onClick={() => setShow(false)}
                >
                  <ButtonWithIcon
                    icon="close"
                    text="Save"
                    onlyIcon={true}
                    backgroundColor={colors.wrong}
                  />
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
