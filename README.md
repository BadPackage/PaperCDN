# PaperCDN

A simple Node.js server to fetch the latest Paper versions. **(Writen by ChatGPT)**

## Usage

### Running with Docker

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/papercdn.git
   cd papercdn
   ```

2. **Start the server using Docker Compose:**
   ```bash
   docker-compose up -d
   ```

3. **Access the server:**

   - Get the latest Paper version:
     ```
     http://localhost:3000/download/paper/latest
     ```

   - Get a specific Paper version:
     ```
     http://localhost:3000/download/paper/<version>
     ```

   Replace `<version>` with the desired Minecraft Paper version number e.g.: 1.21.
