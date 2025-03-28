export default function ArrowRight({ color = "var(--white)", width = "16px", height = "16px" }) {
    return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 382.49 384"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
            <path
              d="M355.49,0c15.81,4.13,25.89,14.83,27,31.5v256.5c-.16,30.02-38.04,43.65-56.98,19.86-2.07-2.6-6.77-11.21-6.77-14.23V111L52.89,376.52c-4.52,4.21-10.44,5.71-16.14,7.48h-11.25c-2.88-2.05-6.3-2.6-9.5-4.38-17.18-9.56-21.16-32.79-8.81-48.06L274.49,63.75H88.87c-3.03,0-11.63-4.7-14.23-6.77C52.53,39.38,62.5,5.63,89.24,0h266.25Z"
              fill={color}
            />
        </svg>
    );
}
