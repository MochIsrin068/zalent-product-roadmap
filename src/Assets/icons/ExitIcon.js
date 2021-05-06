import * as React from "react";

function ExitIcon(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.002 3h-14c-1.103 0-2 .897-2 2v4h2V5h14v14h-14v-4h-2v4c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.898-2-2-2z"
        fill="#fff"
      />
      <path d="M11 16l5-4-5-4v3.001H3v2h8V16z" fill="#fff" />
    </svg>
  );
}

export default ExitIcon;
