export default function Comment(props) {
    
    const data  = props.comments;
  
    return ( 
    <>
    {data &&
        data.map((item) => {
            return (
              <div key={item.id} className="col-md-12">
                <div className="comments mt-4 d-flex">
                <div className="comment-user-img">
                        <img src="https://templates.joomla-monster.com/joomla30/jm-news-portal/components/com_djclassifieds/assets/images/default_profile.png" alt="" className='border rounded-circle d-inline' style={{ height: "40px", width: "40px" }}/>
                </div>
                <div className="comment-details bg-light border rounded p-2" style={{ marginLeft: "10px" }}>
                        <strong>{ item.users.name }</strong>
                        <p>{ item.comment }</p>
                </div>
                </div>
            </div>
            )
            })}
    
    </>         
  );
}
