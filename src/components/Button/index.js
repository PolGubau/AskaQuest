import { colors, fontSizes } from '../../styles/theme'
import { addOpacityToColor } from '../../styles/utils'
export default function Button({ disabled = false, start, text = 'button' }) {
  return (
    <>
      <button className="buttonsContainer" disabled={disabled} onClick={start}>
        <p className="send">{text}</p>
      </button>
      <style jsx>{`
        .buttonsContainer {
          cursor: pointer;
          display: flex;
          justify-content: flex-start;
          width: fit-content;
          align-items: center;
          flex-wrap: wrap;
          flex-direction: row;
          align-content: center;
          margin: 0;
          border-radius: 7px;
          background-color: ${addOpacityToColor(colors.primary, 0.4)};
        }
        .send {
          margin: 0;
          font-size: ${fontSizes.subheader};
          display: flex;
          padding: 5px 15px;
        }
        .buttonsContainer:hover {
          background-color: ${addOpacityToColor(colors.primary, 0.7)};
        }
        .buttonsContainer {
          position: absolute;
          bottom: 20px;
          right: 20px;
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          flex-wrap: wrap;
          flex-direction: column;
          align-content: flex-end;
        }
      `}</style>
    </>
  )
}
