export default function ApplicationLogo({ className = '', ...props }) {
    return (
        <img
            src="/images/our-needs-logo.svg"
            alt="Our Needs Logo"
            className={`select-none ${className}`}
            {...props}
        />
    );
}
