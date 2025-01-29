app.post("/logout", (req, res) => {
    res.clearCookie("authToken");
    req.session.destroy(() => {
        res.status(200).json({ message: "Logged out successfully" });
    });
});