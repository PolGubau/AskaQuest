import { breakpoints, colors, fontSizes } from "../../styles/theme";
import Link from "next/link";
import { addOpacityToColor } from "src/styles/utils";
import usePascalCase from "src/hooks/usePascalCase";
import { getFromStorage } from "src/hooks/useStorage";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Nav({
  actualName = "",
  actualRoot = "home",
  path = [],
  actualLink = "/",
}) {
  const router = useRouter();
  const user = useState(getFromStorage("user"));
  if (!user) {
    router.push("/");
  }
  console.log(user);

  const userName = "a";
  const avatar = "b";
  return (
    <>
      <section>
        <nav>
          <div>
            <Link href={`${"/" + actualRoot}`}>
              <a>{actualRoot}</a>
            </Link>
            {path &&
              path.map((item, index) => (
                <div key={index}>
                  <span>/</span>
                  <Link href={`${"/" + item}`}>
                    <a>{item}</a>
                  </Link>
                </div>
              ))}
            <Link href={`${actualLink}`}>
              <a>
                <span>/</span>
                {actualName}
              </a>
            </Link>
          </div>
          <Link href={`${"/profile/" + userName}`}>
            <a>
              <div className="profileLink">
                <div className="nameProfile">
                  <p>
                    <b>{usePascalCase(userName)}</b>
                  </p>
                  <p>
                    <small>Your Profile</small>
                  </p>
                </div>
                <img className="avatar" src={avatar} alt={userName} />
              </div>
            </a>
          </Link>
        </nav>
      </section>{" "}
      <style jsx>{`
        section {
          display: flex;
          justify-content: center;
        }
        a {
          padding: 2px 5px;
        }
        a:hover {
          text-decoration: underline;
          background-color: ${addOpacityToColor(colors.primary, 0.2)};
          border-radius: 5px;
        }
        nav {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-content: space-between;
          justify-content: space-between;
          width: 100%;
          height: 10vh;
          position: absolute;
          padding: 20px;
          font-size: ${fontSizes.text};
        }
        span {
          color: ${colors.primary};
          margin: 0 10px;
        }
        div {
          display: flex;
          align-items: center;
          align-content: center;
          flex-wrap: wrap;
          flex-direction: row;
          justify-content: space-between;
        }
        .profileLink {
          display: flex;
          padding: 5px 5px 5px 10px;
        }
        .nameProfile {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-end;
        }
        .nameProfile p {
          margin: 0;
        }
        .avatar {
          width: 49px;
          height: 49px;
          margin-left: 10px;
        }
        //midas de pc
        @media (min-width: ${breakpoints.mobile}) {
          nav {
            max-height: 90vh;
            width: 95%;
          }
        }
      `}</style>
    </>
  );
}
