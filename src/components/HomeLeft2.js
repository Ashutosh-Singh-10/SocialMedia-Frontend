import React from 'react'
import "../assets/css/homeleft2.css"
export default function HomeLeft2() {
  return (
    <div className='hpr-mbx'>
      <div className="hpr-mcn1 flexVC">
        <div className='flexCenter'>
        <img src={require("../assets/images/sheldon.png")}  className="hpr-img" alt="" />
        </div>
        <div className='hpr-f1'>
           Sheldon Cooper
        </div>
        <hr className='w90'/>
        <div className='w85 hpr-f2'> 
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt dolorem sequi animi officiis fugiat quis aut consequatur tempore eos fuga numquam consequuntur nam unde laboriosam sunt velit magnam in amet enim consectetur, quaerat, maiores beatae nemo. Necessitatibus perspiciatis assumenda in!
        </div>

      </div>
      <div className="hpr-mcn2 flexVC w100">
        <div className="flexCenter w100 hpr-f2 hpr-bx1">

        <div className="w33 ">24 Posts</div>
        <div className="w33 hpr-l-bd">100 Followers</div>
        <div className="w33 hpr-l-bd">100 Following</div>
          
        </div>
        <div className="flexCenter w100 hpr-bx2">
          My Save
          
          </div>
      </div>

    </div>
  )
}
