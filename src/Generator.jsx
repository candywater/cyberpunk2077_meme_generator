import { useState } from 'react'
import logo1 from './stills/logo-en-ed943f1c.png'
import logo2 from './stills/logo-horizontal-en-8f759eab.svg'
import html2canvas from 'html2canvas'

function App(){

    
    let backgroundImage = new Image()
    let [userimage, setUserimage] = useState("")
    let [userimageheight, setUserimageheight] = useState(80)
    let [userimagewidth, setUserimagewidth] = useState(320)

    let [boxLeft, setBoxLeft] = useState(0)
    let [boxTop, setBoxTop] = useState(0)
    
    function dealSelectFile(event) {
        // get select file.
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            backgroundImage.src = this.result            
            backgroundImage.onload = () =>{
                setUserimage(backgroundImage.src);
                setUserimageheight(backgroundImage.height);
                setUserimagewidth(backgroundImage.width)
            }
        }
    }

    var boxOnMouseDown = (event)=>{
        var oEvent = event;
        // 浏览器有一些图片的默认事件,这里要阻止
        oEvent.preventDefault();
    }

    var faOnMouseMove = event => {
        var oEvent = event;
        oEvent.preventDefault();
        
        var disX = oEvent.clientX - boxLeft;
        var disY = oEvent.clientY - boxTop;
        var x = oEvent.clientX - disX;
        var y = oEvent.clientY - disY;

console.log("====")
        console.log(boxLeft)
        console.log(oEvent.clientX)
        console.log(disX)
        console.log(x)

        // 图形移动的边界判断
        // var fa = event.target
        // x = x <= 0 ? 0 : x;
        // x = x >= fa.offsetWidth - box.offsetWidth ? fa.offsetWidth - box.offsetWidth : x;
        // y = y <= 0 ? 0 : y;
        // y = y >= fa.offsetHeight - box.offsetHeight ? fa.offsetHeight - box.offsetHeight : y;
        setBoxLeft(x)
        setBoxTop(y)
    }

    // 图形移出父盒子取消移动事件,防止移动过快触发鼠标移出事件,导致鼠标弹起事件失效
    var faOnmouseLeave = event => {
        event.target.onmousemove = null
        event.target.onmouseup = null
    }
    // 鼠标弹起后停止移动
    var faOnmouserUp = (event)=>{
        event.target.onmousemove = null
        event.target.onmouseup = null
    }

    return(
        <div>
            <input type="file" id="selectFiles" onChange={dealSelectFile}></input>
            <button type="button" onclick="clickbutton()">Submit</button>
            {/* box是装图片的容器,fa是图片移动缩放的范围,scale是控制缩放的小图标 */}
            <div id="father" style={{
                backgroundImage: `url(${userimage})`, 
                height : `${userimageheight}px`,
                width:  `${userimagewidth}px`
                }}
                onMouseMove = {faOnMouseMove}
                onMouseUp = {faOnmouserUp}
                onMouseLeave = {faOnmouseLeave}
                >
                {/* <img src={userimage} alt="" /> */}
                <div id="box" 
                    onMouseDown={boxOnMouseDown} 
                    // style={{left : `${boxLeft}px`, right : `${boxRight}px`}}
                    offsetLeft = {boxLeft}
                    offsetTop = {boxTop}>
                    <img src={logo2} alt="" srcset="" />
                    <div id="scale"></div>
                </div>
            </div>
            <canvas></canvas>
        </div>
    )
}



export default App