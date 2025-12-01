# SimpleChess

A clean, modern chess game built with React, TypeScript, and Tailwind CSS. This implementation focuses on core chess mechanics with a beautiful, minimalist interface.

## 🎮 Features

- **Complete Chess Gameplay**: Move pieces according to standard chess rules
- **Visual Move Indicators**: Clear highlighting for selected pieces and legal moves
- **Auto-Promotion**: Pawns automatically promote to queens when reaching the opposite side
- **Move History**: Visual indication of the last move made
- **Undo Functionality**: Step back one move at a time
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Clean UI**: Modern interface with coordinated squares and clear visual hierarchy

## 🛠️ Technologies Used

- **React 18** - Frontend framework
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Vite** - Build tool and development server

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/simplechess.git
cd simplechess
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
simplechess/
├── src/
│   ├── components/
│   │   ├── ChessGame.tsx     # Main game component
│   │   └── ChessSquare.tsx   # Individual chess square component
│   ├── logic/
│   │   └── ChessLogic.ts     # Game logic and rules
│   ├── types/
│   │   └── index.ts          # TypeScript type definitions
│   └── App.tsx               # Application entry point
├── public/
│   └── assets/               # Chess piece images
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

## 🎯 How to Play

1. **Select a Piece**: Click on any of your pieces (white moves first)
2. **View Legal Moves**: Selected pieces show green dots for available moves
3. **Make a Move**: Click on a highlighted square to move your piece
4. **Capture**: Move to a square occupied by an opponent's piece to capture it
5. **Promotion**: Pawns automatically become queens when reaching the opposite side

## ⚙️ Game Rules Implemented

### ✅ Supported
- All basic piece movements (pawn, rook, knight, bishop, queen, king)
- Piece capture mechanics
- Pawn promotion to queen
- Turn-based gameplay
- Visual move validation

### 🔄 Planned (Future Updates)
- Castling
- En passant
- Check/checkmate detection
- Stalemate detection
- Move notation (PGN)
- Game state saving
- Two-player online mode

## 🎨 Design Philosophy

The UI follows minimalist principles:
- **Clean Color Palette**: Classic chess board colors (#f0d9b5 and #b58863)
- **Clear Visual Hierarchy**: Different colors for different states (selection, legal moves, last move)
- **Responsive Grid**: Adapts to different screen sizes
- **Subtle Animations**: Smooth transitions and hover effects
- **Accessible**: Good contrast and clear visual indicators

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🧪 Running Tests

```bash
npm test
# or
yarn test
# or
pnpm test
```

## 🏗️ Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The built files will be in the `dist` directory, ready for deployment.

## 🌐 Deployment

Deploy to any static hosting service:

- **Vercel**: `vercel`
- **Netlify**: `netlify deploy`
- **GitHub Pages**: `npm run deploy`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Chess piece icons from [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces)
- Inspired by classic chess implementations
- Built with React and TypeScript best practices

## 📊 Project Status

**Active Development** - Core gameplay complete, additional features planned.

## 🔗 Links

- [Live Demo](https://simplechess.example.com)
- [Issue Tracker](https://github.com/yourusername/simplechess/issues)
- [Documentation](https://github.com/yourusername/simplechess/wiki)

---

Made with ♟️ by [Your Name]