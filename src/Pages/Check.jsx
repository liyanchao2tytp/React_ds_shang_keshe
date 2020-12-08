// import React, { useEffect } from "react";
// import Script from "react-load-script";

// export default function Check() {
//   const checkCheck = () => {
//     var captcha = window.sliderCaptcha({
//       id: "captcha",
//       repeatIcon: "fa fa-redo",
//       setSrc: function () {
//         return (
//           "http://imgs.blazor.zone/images/Pic" +
//           Math.round(Math.random() * 136) +
//           ".jpg"
//         );
//       },
//       onSuccess: function () {
//         //成功事件
//         var handler = setTimeout(function () {
//           window.clearTimeout(handler);
//           captcha.reset();
//         }, 500);
//       },
//     });
//   };

//   return (
//     <>
//       <Script
//         url="http://longbowenterprise.gitee.io/slidercaptcha/disk/longbow.slidercaptcha.min.js"
//         onLoad={checkCheck}
//       />

//       <div
//         class="container-fluid"
//         style={{
//           zIndex: "9999",
//           position: "absolute",
//           right: "40%",
//           bottom: "30%",
//         }}
//       >
//         <div className="form-row">
//           <div className="col-12">
//             <div className="slidercaptcha card">
//               <div className="card-header">
//                 <span>请完成安全验证!</span>
//               </div>
//               <div className="card-body">
//                 <div id="captcha"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
