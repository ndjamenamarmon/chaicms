import React from "react";

const AddIcon = props => {
  const style = {
    enableBackground: "new 0 0 510 510",
    width: props.width ? props.width : "30px",
    height: props.height ? props.height : "30px"
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      id="Capa_1"
      x="0px"
      y="0px"
      style={style}
      className="icon-add"
      viewBox="0 0 510 510"
    >
      <g>
        <g id="add-circle">
          <path
            d="M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z M382.5,280.5h-102v102h-51v-102    h-102v-51h102v-102h51v102h102V280.5z"
            fill="#364051"
          />
        </g>
      </g>
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
    </svg>
  );
};

export default AddIcon;
