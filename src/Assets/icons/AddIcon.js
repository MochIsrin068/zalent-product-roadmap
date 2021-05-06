import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.953 10.313h-3.265V7.046a.172.172 0 00-.172-.172h-1.032a.172.172 0 00-.171.172v3.266H7.046a.172.172 0 00-.172.171v1.032c0 .094.077.171.172.171h3.266v3.266c0 .095.077.172.171.172h1.032a.172.172 0 00.171-.172v-3.265h3.266a.172.172 0 00.172-.172v-1.032a.172.172 0 00-.172-.171z"
        fill="#262626"
      />
      <path
        d="M11 1.375c-5.315 0-9.625 4.31-9.625 9.625s4.31 9.625 9.625 9.625 9.625-4.31 9.625-9.625S16.315 1.375 11 1.375zm0 17.617A7.994 7.994 0 013.008 11 7.994 7.994 0 0111 3.008 7.994 7.994 0 0118.992 11 7.994 7.994 0 0111 18.992z"
        fill="#262626"
      />
    </svg>
  )
}

export default SvgComponent
