import { colors } from "src/styles/theme";
import { addOpacityToColor } from "src/styles/utils";

// type collection= {
//     ID: number;
//     title: string;
//     creator_id: string;
//     date_creation: string;
//     likes: number;
//     tags: string;
// }

export default function CollectionsItem({ collection }) {
  const { ID, title, creator_id, date_creation, likes, tags } = collection;
  console.log(ID, title, creator_id, date_creation, likes, tags);
  return (
    <>
      <section>
        <div>
          <h3>{title}</h3>
          <p>
            {/* {tags.map((tag, index) => (
              <span className="tag" key={index}>
                {tag}
              </span>
            ))} */}
          </p>
        </div>
      </section>

      <style jsx>{`
        section {
          padding: 0 15px;
          border: 1px solid ${colors.primary};
          border-radius: 10px;
          background-color: ${addOpacityToColor(colors.primary, 0.1)};
        }
        section:hover {
          background-color: ${addOpacityToColor(colors.primary, 0.3)};
        }
        .tag {
          background-color: ${colors.primary};
          color: ${colors.white};
          padding: 4px 8px;
          margin: 0 5px 0 0;
          border-radius: 8px;
        }
      `}</style>
    </>
  );
}
