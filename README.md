# 📝 React Native To-Do List App 

## 📌 Description

This is a *To-Do List mobile application* built using *React Native CLI* and *TypeScript*. It allows users to:

- Add, edit, and delete tasks
- if user finished a task he can delete it
- edit the tasks when need to make changes
- Share tasks (Copy, WhatsApp, Facebook, Telegram, VK)
- Persist data using local storage (AsyncStorage)
- Follow a custom dark theme and Material UI styling

🔗 *The design strictly follows this Figma prototype*:  
👉 [Figma Design Link](https://www.figma.com/design/DpURKkYqHEesri8OfC5YJN/Untitled?node-id=0-1&p=f&t=WeXvLJzFFM2iNSca-0)

📹 *Demo Video*:  
👉 [Click to watch demo video](https://drive.google.com/file/d/1hS8WvPjXcYrnZN94XOt__JrxrPQY0hCR/view?usp=drive_link) 


## ⚙ Setup Instructions

### 1️⃣ Clone the repository

bash
git clone https://github.com/your-username/react-native-todo.git
cd react-native-todo


### 2️⃣ Install dependencies

bash
npm install
# or
yarn install


---

## 📱 How to Run the App

### ✅ For Android:

Make sure you have Android Studio and emulator or USB device connected.

bash
npx react-native run-android


### 🍏 For iOS (Mac only):

Make sure Xcode and CocoaPods are properly set up.

bash
cd ios
pod install
cd ..
npx react-native run-ios


---


## 📦 Technologies Used

- React Native CLI (not Expo)
- TypeScript
- Zustand (state management)
- AsyncStorage (persistent storage)
- React Native Modal & Touchable components
- Material UI-inspired custom styles
