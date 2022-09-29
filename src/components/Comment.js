import { useState } from "react";
import { Link } from "react-router-dom";

export default function Comment(props) {
  const data = props.comments;

  const [reply, setReply] = useState(false);
  const [seletedCommment, setSelectedComment] = useState("");

  return (
    <>
      {data &&
        data.map((item) => {
          return (
            <div key={item.id} className="col-md-12">
              <div className="comments mt-4 d-flex">
                <div className="comment-user-img">
                  <img
                    src="https://templates.joomla-monster.com/joomla30/jm-news-portal/components/com_djclassifieds/assets/images/default_profile.png"
                    alt=""
                    className="border rounded-circle d-inline"
                    style={{ height: "40px", width: "40px" }}
                  />
                </div>
                <div
                  className="comment-details bg-light border rounded p-2"
                  style={{ marginLeft: "10px" }}
                >
                  <strong>{item.users.name}</strong>
                  <p>{item.comment}</p>
                </div>
              </div>
              <div className="reply-comment">
                <div className="relpy-link" style={{ marginLeft: "60px" }}>
                  <Link className="text-decoration-none" onClick={ () => {setReply(true)}}>
                    reply <i class="fas fa-reply"></i>
                  </Link>
                </div>
                {reply ? (
                        <div className="row">
                        <div className="col-md-4">
                          <div className="relpy-comment" style={{ marginLeft: "80px" }}>
                            <textarea
                              rows="2"
                              cols="5"
                              className="form-control"
                            ></textarea>
                            <button className="btn btn-sm btn-primary mt-2">Reply</button>
                          </div>
                        </div>
                      </div>
                ):(
                        <></>
                )}
              </div>
            </div>
          );
        })}
    </>
  );
}
