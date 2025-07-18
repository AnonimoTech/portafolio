import Router from './router';
import Header from './components/shared/Header/Header';
import Footer from './components/shared/Footer/Footer';
import WhatsAppFloating from './components/shared/WhatsApp/WhatsAppFloating';
import './App.css'; // Asegurate de tenerlo importado

function App() {
  return (
    <div className="app-container">
      <div className="container-fluid sinPadding bg-transparent">
        <Header />
      </div>

      <main className="flex-fill">
        <div className="container-fluid sinPadding bg-transparent">
          <Router />
        </div>
      </main>

      <div className="container-fluid sinPadding bg-transparent">
        <Footer />
      </div>

      <WhatsAppFloating />
    </div>
  );
}

export default App;
