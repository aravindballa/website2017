import Typography from 'typography';

const typography = new Typography({
  headerFontFamily: ['Poppins', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
  bodyFontFamily: ['Work Sans', 'monospace'],
  googleFonts: [
    { name: 'Work Sans', styles: [200, 400, 600] },
    { name: 'Poppins', styles: [200, 400, 600] },
  ],
});

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
