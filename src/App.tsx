import { CursorFollower } from './components/UI';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { QuoteCalculator } from './components/sections/QuoteCalculator';
import { Services } from './components/sections/Services';
import { Trust } from './components/sections/Trust';
import { Location } from './components/sections/Location';

function App() {
    return (
        <div className="min-h-screen bg-[#030014] text-white selection:bg-purple-500/30 overflow-x-hidden">
            <CursorFollower />
            <Header />

            <main>
                <Hero />
                <QuoteCalculator />
                <Services />
                <Trust />
                <Location />
            </main>

            <Footer />
        </div>
    );
}

export default App;
