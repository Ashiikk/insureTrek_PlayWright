# 🚀 InsureTrek Quick Start Guide

## ⚡ Get Running in 3 Steps

### 1. **Setup Project**
```bash
# Make setup script executable and run it
chmod +x setup.sh
./setup.sh
```

### 2. **Run Your First Test**
```bash
npm run test:hai-buchwalter
```

### 3. **View Results**
- **HTML Report**: Automatically opens after test completion
- **Screenshots**: `test-results/` directory
- **Videos**: `test-results/` directory

## 🎯 What This Test Does

The **Hai Buchwalter Indiana License Management Flow** test:

1. **Logs into InsureTrek** with test credentials
2. **Navigates to Manage Producers** section
3. **Searches for "Hai Buchwalter"** producer
4. **Manages Indiana license assignments** with 22 detailed steps
5. **Verifies all assignments** with comprehensive assertions
6. **Cleans up** and logs out

## 📊 Test Results

After running the test, you'll get:

- ✅ **Step-by-step execution logs** in console
- 📸 **Screenshots** for each step
- 🎥 **Video recording** of entire test
- 📋 **HTML report** with detailed results
- 🔍 **Trace files** for debugging

## 🚨 If Something Goes Wrong

### **Common Issues & Solutions**

1. **"Element not found" errors**
   ```bash
   npm run test:debug  # Run in debug mode
   ```

2. **Login failures**
   - Check internet connection
   - Verify credentials in test file
   - Ensure InsureTrek is accessible

3. **Viewport issues**
   - Test automatically detects Mac 14-inch screen
   - Check `playwright.config.ts` for settings

### **Get Help**

- **Debug Mode**: `npm run test:debug`
- **Generate Code**: `npm run codegen`
- **View Reports**: `npm run report`
- **Clean Results**: `npm run clean`

## 🔧 Available Commands

| Command | What It Does |
|---------|--------------|
| `npm run test:hai-buchwalter` | 🎯 **Main test** - Run complete flow |
| `npm run test:debug` | 🐛 Debug mode with step-by-step execution |
| `npm run codegen` | 📝 Record new test actions |
| `npm run report` | 📊 Open HTML test report |
| `npm run clean` | 🧹 Clean test results |

## 📱 Your Screen Setup

The test automatically configures for your **Mac 14-inch** screen:
- **Width**: 1512px
- **Height**: 982px
- **Scale**: 2x (Retina)
- **Browser**: Maximized

## 🎉 You're Ready!

Run the test and watch the automation in action:

```bash
npm run test:hai-buchwalter
```

---

**Need more details?** Check the full `README.md` file for comprehensive documentation.
