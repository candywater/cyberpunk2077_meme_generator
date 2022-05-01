import React, { useState } from 'react'
import logo1 from './stills/logo-en-ed943f1c.png'
import logo2 from './stills/logo-horizontal-en-8f759eab.svg'
import html2canvas from 'html2canvas'

function App() {


    let backgroundImage = new Image()
    let [userimage, setUserimage] = useState("")
    let [userimageheight, setUserimageheight] = useState(80)
    let [userimagewidth, setUserimagewidth] = useState(320)

    let [boxLeft, setBoxLeft] = useState(0)
    let [boxTop, setBoxTop] = useState(0)

    let [boxStartDragLeft, setBoxStartDragLeft] = useState(0)
    let [boxStartDragTop, setBoxStartDragTop] = useState(0)
    let [mouseStartDragLeft, setMouseStartDragLeft] = useState(0)
    let [mouseStartDragTop, setMouseStartDragTop] = useState(0)

    let [isMouseDrag, setIsMouseDrag] = useState(false)

    function dealSelectFile(event) {
        // get select file.
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            backgroundImage.src = this.result
            backgroundImage.onload = () => {
                setUserimage(backgroundImage.src);
                setUserimageheight(backgroundImage.height);
                setUserimagewidth(backgroundImage.width)
            }
        }
    }

    async function submitUserImage(event) {
        console.log("submitted")
        var result = await html2canvas(document.getElementById('father'));
        removeAllChild(document.querySelector("#res"))
        document.querySelector("#res").appendChild(result)
        console.log(result)
    }

    function removeAllChild(node) {
        if (!node) return;
        if (!node.childNodes) return;
        node.childNodes.forEach(x => {
            if (x)
                node.removeChild(x)
        })
    }

    /* box是装图片的容器,fa是图片移动缩放的范围,scale是控制缩放的小图标 */
    var boxOnMouseDown = (event) => {
        if (!userimage) return;
        setIsMouseDrag(true)
        setBoxStartDragLeft(boxLeft)
        setBoxStartDragTop(boxTop)
        setMouseStartDragLeft(event.clientX)
        setMouseStartDragTop(event.clientY)

        // console.log(event)
        // to prevent image draggable
        event.preventDefault();
    }

    var boxOnMouseUp = event => {
        if (!userimage) return;
        setIsMouseDrag(false)

        // to prevent image draggable
        event.preventDefault();
    }

    var boxOnMouseMove = event => {
        // if (event.clientX > userimagewidth || event.clientY > userimageheight) setIsMouseDrag(false)
        if (!userimage) return;
        if (!isMouseDrag) return;
        event.preventDefault();
        let mouseDraggedLeftOnBox = event.clientX - mouseStartDragLeft
        let mouseDraggedTopOnBox = event.clientY - mouseStartDragTop
        setBoxLeft(boxStartDragLeft + mouseDraggedLeftOnBox)
        setBoxTop(boxStartDragTop + mouseDraggedTopOnBox)
    }

    var faOnMouseMove = event => {
        // event.target.onmousemove = null
        // event.target.onmouseup = null
        event.preventDefault()
    }

    // 图形移出父盒子取消移动事件,防止移动过快触发鼠标移出事件,导致鼠标弹起事件失效
    var faOnmouseLeave = event => {
        event.target.onmousemove = null
        event.target.onmouseup = null
    }
    // 鼠标弹起后停止移动
    var faOnmouserUp = (event) => {
        event.target.onmousemove = null
        event.target.onmouseup = null
    }

    const FileInputClass = `inline-flex items-center px-4 py-2 bg-gray-600 border border-gray-600 rounded-l 
    font-semibold cursor-pointer text-sm text-white tracking-widest 
    hover:bg-gray-500 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-25 transition `
    const SubmitBtnClass = `text-sm rounded-r-lg bg-sky-400  text-gray-800 font-bold px-4 py-2 uppercase border-sky-500 border-t border-b border-r`


    return (
        <div>

            <input className={FileInputClass} type="file" id="selectFiles" onChange={dealSelectFile}></input>
            <button className={SubmitBtnClass} type="button" onClick={submitUserImage}>Submit</button>

            {/* box是装图片的容器,fa是图片移动缩放的范围,scale是控制缩放的小图标 */}
            <div id="father"
                style={{
                    backgroundImage: `url(${userimage})`,
                    height: `${userimageheight}px`,
                    width: `${userimagewidth}px`
                }}
                onMouseMove={faOnMouseMove}
                onMouseUp={faOnmouserUp}
                onMouseLeave={faOnmouseLeave}
            >
                {/* <img src={userimage} alt="" /> */}
                <div id="box"
                    onMouseDown={boxOnMouseDown}
                    onMouseUp={boxOnMouseUp}
                    onMouseMove={boxOnMouseMove}
                    style={{
                        position: backgroundImage ? 'relative' : 'absolute',
                        left: `${boxLeft}px`,
                        top: `${boxTop}px`
                    }}
                // offsetLeft={boxLeft}
                // offsetTop={boxTop}
                >
                    <img src={logo2} alt="" srcSet="" />
                    <div id="scale"></div>
                </div>
            </div>

            <div id='res'>
            </div>
        </div>
    )
}



export default App