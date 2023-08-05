import React from 'react'
import '../assets/css/homeleft.css'
export default function HomeLeft() {
  return (
    <div className='hl-mbx'>
      <div className="hl-mcn1 flexVC">
        <div className='flexCenter'>
        <img src={require("../assets/images/sheldon.png")}  className="hl-img" alt="" />
        </div>
        <div className='hl-f1'>
           Sheldon Cooper
        </div>
        <hr className='w90'/>
        <div className='w85 hl-f2'> 
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt dolorem sequi animi officiis fugiat quis aut consequatur tempore eos fuga numquam consequuntur nam unde laboriosam sunt velit magnam in amet enim consectetur, quaerat, maiores beatae nemo. Necessitatibus perspiciatis assumenda in!
        </div>

      </div>
      <div className="hl-mcn2 flexVC w100">
        <div className="flexCenter w100 hl-f2 hl-bx1">

        <div className="w33 ">24 Posts</div>
        <div className="w33 hl-l-bd">100 Followers</div>
        <div className="w33 hl-l-bd">100 Following</div>
          
        </div>
        <div className="flexCenter w100 hl-bx2">
          My Save
          
          </div>
      </div>

    </div>
  )
}
