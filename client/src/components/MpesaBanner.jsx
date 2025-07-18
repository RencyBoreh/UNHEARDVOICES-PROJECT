const MpesaBanner = () => {
  return (
    <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-fuchsia-200 dark:from-purple-800 dark:to-purple-950 text-purple-900 dark:text-white p-6 rounded-xl shadow-lg text-center border border-purple-200 dark:border-fuchsia-600">
      <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
        Make a Difference Today
      </h3>
      <p className="text-lg mb-1 font-medium">
        Send your support directly to our M-PESA line:
      </p>
      <p className="text-xl font-bold text-fuchsia-700 dark:text-pink-300 mb-3">
        📱 <span className="tracking-wide">0722 514 616</span>
      </p>
      <p className="text-sm italic text-purple-700 dark:text-purple-200">
        Your contribution helps children in need access food, shelter, medical care, and dignity.
        Even a small gift can be life-changing 💖
      </p>
    </div>
  );
};

export default MpesaBanner;
