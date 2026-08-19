import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowRight, Check, Menu, Search, Wallet, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Nft = {
  id: string;
  title: string;
  creator: string;
  category: string;
  price: string;
  image: string;
  gradient: string;
};

const nfts: Nft[] = [
  { id: "orbit-01", title: "Orbit Bloom", creator: "Lina Park", category: "Art", price: "2.40 ETH", image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=900&q=85", gradient: "#8375e8" },
  { id: "echo-02", title: "Echo Chamber", creator: "Niko Vale", category: "Music", price: "1.85 ETH", image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=900&q=85", gradient: "#f5b84b" },
  { id: "terra-03", title: "Terra Block", creator: "Maya Stone", category: "Virtual World", price: "3.10 ETH", image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?auto=format&fit=crop&w=900&q=85", gradient: "#78c5c7" },
  { id: "pixel-04", title: "Pixel Memory", creator: "Owen Reed", category: "Collectibles", price: "0.95 ETH", image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&w=900&q=85", gradient: "#ef8eae" },
  { id: "portal-05", title: "Portal Study", creator: "Ari Chen", category: "Domain Names", price: "4.20 ETH", image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=900&q=85", gradient: "#7467d9" },
  { id: "future-06", title: "Future Relic", creator: "Sam Kade", category: "Art", price: "2.05 ETH", image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=900&q=85", gradient: "#f7d47a" },
];

const categories = ["All NFTs", "Art", "Music", "Domain Names", "Virtual World", "Collectibles"];

function getSelected() {
  const id = window.location.hash.match(/^#\/nft\/([^/]+)/)?.[1];
  return nfts.find((nft) => nft.id === id);
}

export default function NFTMarketplace() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All NFTs");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<Nft | undefined>(() => getSelected());

  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-out-cubic", once: true, offset: 50 });
    const onHashChange = () => {
      setSelected(getSelected());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const visible = useMemo(() => nfts.filter((nft) => {
    const matchesCategory = category === "All NFTs" || nft.category === category;
    const matchesQuery = `${nft.title} ${nft.creator} ${nft.category}`.toLowerCase().includes(query.trim().toLowerCase());
    return matchesCategory && matchesQuery;
  }), [category, query]);

  if (selected) return <NftDetail nft={selected} />;

  return (
    <div className="nft-site">
      <header className="nft-header">
        <a className="nft-logo" href="#/" aria-label="Nexa NFT World home"><span className="nft-logo-icon">◆</span><span>NEXA <b>NFT WORLD</b></span></a>
        <label className="nft-search"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="search item here..." aria-label="Search NFT items" /></label>
        <nav className={menuOpen ? "nft-nav open" : "nft-nav"} aria-label="Primary navigation">
          <a href="#/" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#marketplace" onClick={() => setMenuOpen(false)}>Explore</a>
          <button className="wallet-button" onClick={() => window.alert("This feature has not been implemented yet")}><Wallet size={16} /> Connect wallet</button>
        </nav>
        <button className="nft-menu" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close navigation" : "Open navigation"}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section className="nft-hero">
          <div className="nft-hero-copy" data-aos="fade-up">
            <p className="nft-eyebrow">DIGILAND MARKET</p>
            <h1>Create, sell or collect digital items.</h1>
            <p>Unit of data stored on a digital ledger, called a blockchain, that certifies a digital asset to be unique and therefore not interchangeable</p>
            <a className="nft-primary" href="#marketplace">Explore <ArrowRight size={17} /></a>
          </div>
          <div className="nft-hero-art" data-aos="zoom-in" data-aos-delay="120"><img src="/reference-media/ultraverse-nft.png" alt="NFT cube connected to digital item cards" /></div>
        </section>

        <section className="nft-strip" aria-label="Marketplace categories"><span>TOP SELLERS</span><span>BROWSE BY CATEGORY</span><span>MARKETPLACE</span></section>

        <section className="nft-content" id="marketplace">
          <div className="nft-section-heading" data-aos="fade-up"><div><p className="nft-eyebrow">EXPLORE THE COLLECTION</p><h2>Find your next <em>digital original.</em></h2></div><p>Discover sample assets across art, music, domains, virtual worlds, and collectibles.</p></div>
          <div className="nft-controls" data-aos="fade-up" data-aos-delay="80"><div className="nft-category-row" role="group" aria-label="Filter NFT category">{categories.map((item) => <button className={category === item ? "category active" : "category"} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div><span className="result-count">{visible.length} items</span></div>
          <div className="nft-grid" aria-live="polite">{visible.map((nft, index) => <NftCard key={nft.id} nft={nft} index={index} />)}</div>
          {!visible.length && <div className="nft-empty"><h3>No items found.</h3><button onClick={() => { setQuery(""); setCategory("All NFTs"); }}>Reset marketplace</button></div>}
        </section>

        <section className="seller-section" id="sellers" data-aos="fade-up"><div><p className="nft-eyebrow">TOP SELLERS</p><h2>Meet the<br /><em>creative orbit.</em></h2></div><div className="seller-list">{["Lina Park", "Niko Vale", "Maya Stone"].map((seller, index) => <div className="seller-row" key={seller}><span>0{index + 1}</span><strong>{seller}</strong><small>{["2.4k", "1.8k", "980"][index]} items collected</small><ArrowRight size={18} /></div>)}</div></section>

        <section className="nft-note" data-aos="fade-up"><p className="nft-eyebrow">A NOTE FROM THE MARKET</p><h2>Built for discovery.<br /><em>Designed for clarity.</em></h2><p>This course-spec study uses sample NFT content and a simulated wallet action. It does not connect a wallet, process transactions, or represent real marketplace activity.</p></section>
      </main>

      <footer className="nft-footer"><div className="nft-logo"><span className="nft-logo-icon">◆</span><span>NEXA <b>NFT WORLD</b></span></div><div><strong>Resources</strong><a href="#sellers">Help Center</a><a href="#sellers">Partners</a><a href="#sellers">Suggestions</a><a href="#sellers">Discord</a><a href="#sellers">Docs</a></div><div><strong>Community</strong><a href="#sellers">Documentation</a><a href="#sellers">Brand Assets</a><a href="#sellers">Blog</a><a href="#sellers">Forum</a><a href="#sellers">Mailing List</a></div><div><strong>Newsletter</strong><p>Signup for our newsletter to get the latest news in your inbox.</p><label className="newsletter"><input placeholder="Your email" aria-label="Newsletter email" /><button aria-label="Join newsletter"><ArrowRight size={16} /></button></label></div><small>© 2026 NEXA NFT WORLD / Course-spec study project</small></footer>
    </div>
  );
}

function NftCard({ nft, index }: { nft: Nft; index: number }) {
  return <article className="nft-card" data-aos="fade-up" data-aos-delay={Math.min(index * 60, 240)}><a href={`#/nft/${nft.id}`} className="nft-card-image"><img src={nft.image} alt={`${nft.title} digital artwork`} /><span className="nft-tag">{nft.category}</span></a><div className="nft-card-body"><div><h3><a href={`#/nft/${nft.id}`}>{nft.title}</a></h3><p>by {nft.creator}</p></div><strong>{nft.price}</strong></div></article>;
}

function NftDetail({ nft }: { nft: Nft }) {
  return <div className="nft-site"><header className="nft-header"><a className="nft-logo" href="#/" aria-label="Nexa NFT World home"><span className="nft-logo-icon">◆</span><span>NEXA <b>NFT WORLD</b></span></a><nav className="nft-nav detail-nav"><a href="#/">Home</a><a href="#marketplace">Explore</a><button className="wallet-button" onClick={() => window.alert("This feature has not been implemented yet")}><Wallet size={16} /> Connect wallet</button></nav></header><main className="detail-main"><a className="detail-back" href="#/">← Back to marketplace</a><section className="nft-detail"><div className="nft-detail-art" data-aos="fade-right"><img src={nft.image} alt={`${nft.title} digital artwork`} /></div><div className="nft-detail-copy" data-aos="fade-left"><p className="nft-eyebrow">{nft.category} / DIGITAL ITEM</p><h1>{nft.title}</h1><p className="detail-creator">Created by <strong>{nft.creator}</strong></p><p>One sample digital collectible from the Nexa study marketplace. Explore the visual asset and review its sample listing information.</p><div className="detail-price"><span>Current price</span><strong>{nft.price}</strong></div><button className="nft-primary" onClick={() => window.alert("Demo action only — no wallet or transaction is connected.")}>Place a bid <ArrowRight size={17} /></button><p className="detail-boundary"><Check size={15} /> Simulated interaction only</p></div></section></main><footer className="nft-footer compact"><div className="nft-logo"><span className="nft-logo-icon">◆</span><span>NEXA <b>NFT WORLD</b></span></div><small>© 2026 NEXA NFT WORLD / Course-spec study project</small></footer></div>;
}
